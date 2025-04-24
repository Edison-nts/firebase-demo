import fireLib from '../../../lib/firebase-lib'

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  // fireLib.open();

  var data = await fireLib.obterMoradores();
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}