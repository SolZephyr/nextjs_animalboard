// export async function GET(request: Request) {
//   return new Response(JSON.stringify("Hello world!"), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }

export async function POST(request: Request) {
  const body = await request.json();
  const { value } = body;

  return new Response(JSON.stringify(`Hello, ${value}!`), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}