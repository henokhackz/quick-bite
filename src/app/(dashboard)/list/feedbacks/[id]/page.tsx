// app/(your route)/feedback/[id]/page.tsx
import { getFeedbackById, deleteFeedbackById, updateFeedbackStatus } from "@/lib/actions/student.action";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const feedback = await getFeedbackById(params.id);
    return {
        title: feedback?.title || "Feedback Detail",
        description: feedback?.message || "",
    };
};

const FeedbackDetailPage = async ({ params }: { params: { id: string } }) => {
    const feedback = await getFeedbackById(params.id);
    if (!feedback) return notFound();

    const session = await auth();
    const user = session?.user;

    const canManage = user && user.role !== 'student';

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="relative md:w-1/3 h-80 md:h-auto">
                    <Image
                        src={feedback.photoUrl || '/avatar.png'}
                        alt="Feedback Image"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {feedback.title}
                        </h1>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Description:</span> {feedback.message}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={feedback.status === "PENDING" ? "text-yellow-500" : "text-green-500"}>Status:</span> {feedback.status}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Created At:</span>{" "}
                            {new Date(feedback.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                        <div className="relative w-12 h-12 mr-4">
                            <Image
                                src={feedback.user?.image || '/avatar.png'}
                                alt="User Avatar"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">
                                {feedback.user?.username || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Only show for staff/admins */}
                    {canManage && (
                        <form
                            action={async (formData) => {
                                'use server';
                                const status = formData.get('status') as any;
                                await updateFeedbackStatus(feedback.id, status);
                                revalidatePath(`/feedback/${feedback.id}`);
                            }}
                            className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-4"
                        >
                            <select
                                name="status"
                                defaultValue={feedback.status}
                                className="border px-4 py-2 rounded"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                            <button
                                type="submit"
                                className="px-4 flex gap-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                <Pencil size={20} /> Update
                            </button>
                            <form
                                action={async () => {
                                    'use server';
                                    await deleteFeedbackById(feedback.id);
                                    redirect('/feedback'); // or wherever your list page is
                                }}
                            >
                                <button
                                    type="submit"
                                    className="px-4 flex gap-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    <Trash2 size={20} /> Delete
                                </button>
                            </form>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackDetailPage;
