let resultMap = [
  { id: 1, title: "Run Next.js", completed: false },
  { id: 2, title: "Build a repository", completed: false },
];

export async function GET(req) {
  return new Response(JSON.stringify(resultMap), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const newTodo = { id: Date.now(), ...body };
  resultMap.push(newTodo);
  return new Response(JSON.stringify(newTodo), { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();
  const { id, completed } = body;
  resultMap = resultMap.map((resultMap) =>
    resultMap.id === id ? { ...resultMap, completed } : resultMap
  );
  return new Response(JSON.stringify({ message: "resultMap updated" }), { status: 200 });
}

export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;
  resultMap = resultMap.filter((resultMap) => resultMap.id !== id);
  return new Response(JSON.stringify({ message: "resultMap deleted" }), { status: 200 });
}
