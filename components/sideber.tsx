export default function Sideber() {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">会話の履歴</h2>
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="mb-2"><a href="#" className="w-full block hover:bg-gray-200 p-2 rounded">チャット履歴{index + 1}</a></li>
          ))}
        </ul>
    </div>
  );
}