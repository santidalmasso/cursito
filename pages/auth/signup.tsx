import { Button, Divider, Input } from "@components/ui";

function SignUp() {
  return (
    <main className="grid place-items-center h-screen min-h-full py-20 px-10">
      <div>
        <h1 className="text-gray-700 text-3xl font-medium">
          Registrate a la plataforma!
        </h1>
      </div>
      <form className="w-full max-w-sm">
        <Input className="mb-5" placeholder="Introduce tu nombre" type="name" />
        <Input
          className="mb-5"
          placeholder="Introduce tu email"
          type="surname"
        />
        <Input className="mb-5" placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Divider className="my-10 mx-1" />
        <Button>Registrar</Button>
      </form>
    </main>
  );
}

export default SignUp;
