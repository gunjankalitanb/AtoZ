type Inspiration = {
  slug: string;
  title: string;
  createdAt: string;
};

export default function WebsiteTable({ data }: { data: Inspiration[] }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Slug</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.slug}>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.slug}</td>
              <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
