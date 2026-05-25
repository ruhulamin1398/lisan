import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

interface ContactMessagePageProps {
  params: {
    id: string;
  };
}

export default async function ContactMessagePage({
  params,
}: ContactMessagePageProps) {
  await dbConnect();

  const message = (await ContactMessage.findById(params.id).populate(
    "serviceType",
  )) as any;

  if (!message) {
    notFound();
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Contact Message
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details for the selected contact form submission.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{message.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{message.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {message.phone || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Service Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {message.serviceType?.name || "Unknown"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {message.message}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {message.read ? "Read" : "Unread"}
                </dd>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/admin/contact-messages/list"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Back to messages
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
