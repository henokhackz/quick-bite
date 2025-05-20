'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import Webcam from 'react-webcam';
import { submitFeedback } from '@/lib/actions/student.action';

const rolesEnum = z.enum(['admin', 'ticketHolder', 'dormManager', 'studentService']);
const feedbackSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  roles: z.array(rolesEnum).min(1, 'Select at least one role'),
  photo: z.string().optional(),
});

type Inputs = z.infer<typeof feedbackSchema>;

// Role values with UI-friendly labels
const ROLES: { label: string; value: Inputs['roles'][number] }[] = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Cafe Staff', value: 'ticketHolder' },
  { label: 'Dorm Staff', value: 'dormManager' },
  { label: 'Student Service', value: 'studentService' },
];

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: 'user',
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function FeedbackForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(feedbackSchema),
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotoPreview(imageSrc);
      setValue('photo', imageSrc);
    }
  }, [setValue]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setPhotoPreview(base64);
      setValue('photo', base64);
    }
  };

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const { success } = await submitFeedback(data);
      if (!success) throw new Error('Submission failed');

      toast.success('Feedback submitted successfully!');
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold">Submit Feedback</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input {...register('title')} className="w-full border rounded px-3 py-2" placeholder="Title" />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea {...register('message')} rows={4} placeholder="Write your feedback here..." className="w-full border rounded px-3 py-2" />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
      </div>

      {/* Roles */}
      <div>
        <label className="block mb-1 font-medium">Send To (Select roles)</label>
        <div className="flex flex-wrap gap-3">
          {ROLES.map(({ value, label }) => (
            <label key={value} className="inline-flex items-center space-x-2">
              <input type="checkbox" value={value} {...register('roles')} className="rounded" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.roles && <p className="text-red-600 text-sm mt-1">{errors.roles.message}</p>}
      </div>

      {/* Photo */}
      <div>
        <label className="block mb-1 font-medium">Photo (optional)</label>
        <div className="flex gap-4 mb-3">
          <button type="button" onClick={() => setUseCamera(false)} className={`px-4 py-2 border rounded ${!useCamera ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            Upload File
          </button>
          <button type="button" onClick={() => setUseCamera(true)} className={`px-4 py-2 border rounded ${useCamera ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            Use Camera
          </button>
        </div>

        {useCamera ? (
          <>
            <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} className="rounded border" width={320} height={240} />
            <button type="button" onClick={capture} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
              Capture Photo
            </button>
          </>
        ) : (
          <input type="file" accept="image/*" onChange={onFileChange} className="border rounded px-3 py-2 w-full" />
        )}

        {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded border" />}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isLoading} className={`w-full py-3 rounded text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}
