import GroupForm from "@/components/forms/group-form";

export default function NewGroupPage() {
  return (
    <div className="max-w-2xl mx-auto p-5 space-y-4 flex flex-col bg-white rounded-lg shadow-md h-screen ">
      <h1 className="text-2xl font-semibold mb-4 text-dashboardForeground/80">Create a New Group</h1>
      <GroupForm />
    </div>
  );
}
