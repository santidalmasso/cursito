import { Button, Divider, Input } from "@components/ui";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import s from "./index.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/courses",
        permanent: false,
      },
      props: { session },
    };
  }

  return {
    props: {},
  };
};

function IndexPage() {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SignUpError, setSignUpError] = useState(false);
  const [LoginError, setLoginError] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  function closeSignUpModal() {
    setSignUpError(false);
    setIsOpenSignUp(false);
  }

  function openSignUpModal() {
    setIsOpenSignUp(true);
  }

  function closeLoginModal() {
    setLoginError(false);
    setIsOpenLogin(false);
  }

  function openLoginModal() {
    setIsOpenLogin(true);
  }

  function goLogin() {
    closeSignUpModal();
    openLoginModal();
  }

  function goSignUp() {
    closeLoginModal();
    openSignUpModal();
  }

  function register(event) {
    event.preventDefault();
    window
      .fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name: event.target.name.value,
          surname: event.target.surname.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      })
      .then((res) => {
        if (!res.ok) setSignUpError(true);
        setLoading(false);
        goLogin();
      })
      .catch(() => {
        setSignUpError(true);
      });
  }

  function login(event) {
    event.preventDefault();
    signIn("credentials", {
      email: event.target.email.value,
      password: event.target.password.value,
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/courses`,
    })
      .then((res) => {
        if (!res.ok) setLoginError(true);
        setLoading(false);
        router.push("/events");
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  return (
    <main className={s.main}>
      <div className={s.roundWave}>
        <img src="/images/round-wave.svg" />
      </div>
      <div className={s.wave}>
        <img src="/images/wave.svg" />
      </div>
      <div className="mx-auto p-8 flex-col gap-6 inset-0 flex items-center justify-center max-w-sm h-screen">
        {session ? (
          <Button variant="glass" onClick={() => signOut()}>
            Cerrar Sesión
          </Button>
        ) : (
          <>
            <Button variant="glass" onClick={openSignUpModal}>
              Registrarse
            </Button>
            <Button variant="glass" onClick={openLoginModal}>
              Iniciar Sesión
            </Button>
          </>
        )}
      </div>

      <Transition appear show={isOpenSignUp} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeSignUpModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="crystal inline-block w-full max-w-md p-12 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-gray-100 text-5xl mb-6 font-semibold"
                >
                  Registrarse
                </Dialog.Title>
                <div className="mt-2 mb-4">
                  <p className="text-md text-gray-100">
                    Accedé a nuestros cursos y aprendé todo lo que puedas
                  </p>
                </div>
                <form onSubmit={register}>
                  <Input
                    className="my-2"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    minLength={2}
                    required
                  />
                  <Input
                    className="my-2"
                    name="surname"
                    type="text"
                    placeholder="Apellido"
                    minLength={2}
                    required
                  />
                  <Input
                    className="my-2"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Dirección de email"
                    required
                  />
                  <Input
                    className="my-2"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    minLength={8}
                    required
                  />
                  {SignUpError && (
                    <p className="text-red-100 mt-2">
                      Algo salió mal. Vuelva a intentar en unos minutos
                    </p>
                  )}
                  <Button loading={loading} type="submit" className="my-4 mt-6">
                    Registrarse
                  </Button>
                </form>
                <Divider className="mx-2 my-4" />
                <p className="text-white">
                  ¿Ya tienes una cuenta?{" "}
                  <span
                    className="text-green-200 font-medium cursor-pointer"
                    onClick={goLogin}
                  >
                    Inicia sesión
                  </span>
                </p>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenLogin} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeLoginModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="crystal inline-block w-full max-w-md p-12 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-gray-100 text-5xl mb-6 font-semibold"
                >
                  Inicia Sesión
                </Dialog.Title>
                <div className="mt-2 mb-4">
                  <p className="text-md text-gray-100">
                    Accedé a nuestros cursos y aprendé todo lo que puedas
                  </p>
                </div>
                <form onSubmit={login}>
                  <Input
                    className="my-2"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Dirección de email"
                    required
                  />
                  <Input
                    className="my-2"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    minLength={8}
                    required
                  />
                  {LoginError && (
                    <p className="text-red-100 mt-2">
                      Algo salió mal. Vuelva a intentar en unos minutos
                    </p>
                  )}
                  <Button loading={loading} type="submit" className="my-4 mt-6">
                    Inicia Sesión
                  </Button>
                </form>
                <Divider className="mx-2 my-4" />
                <p className="text-white">
                  ¿No tienes una cuenta?{" "}
                  <span
                    className="text-green-200 font-medium cursor-pointer"
                    onClick={goSignUp}
                  >
                    Registrate
                  </span>
                </p>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

export default IndexPage;
