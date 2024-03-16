import { getAllNotes } from "../actions/notes.action";

export const AddCookie = () => {
  const data = [
    {
      content:
        "<img src=https://res.cloudinary.com/md-dlg/image/upload/v1710016235/o7fjowapultfcdyxpaas.webp />",
      createdAt: "2024-03-09T20:30:35Z",
      id: "1710016236666o7fjowapultfcdyxpaas",
    },
    {
      content:
        "<img src=https://res.cloudinary.com/md-dlg/image/upload/v1710016237/lmhcvmzxqzix5wfafowt.webp />",
      createdAt: "2024-03-09T20:30:37Z",
      id: "1710016238484lmhcvmzxqzix5wfafowt",
    },
    {
      content:
        "<img src=https://res.cloudinary.com/md-dlg/image/upload/v1710016275/ph7i8grwpssvozlexabp.png />",
      createdAt: "2024-03-09T20:31:15Z",
      id: "1710016275885ph7i8grwpssvozlexabp",
    },
    {
      content: "<p>Nueva tarea</p>",
      createdAt: "2024-03-09T21:47:43.193Z",
      id: "1710020863193",
    },
    {
      content: "<p>Nueva tarea</p>",
      createdAt: "2024-03-09T21:51:02.462Z",
      id: "1710021062462",
    },
    {
      content: "<p>Nueva tarea viejo</p>",
      createdAt: "2024-03-09T21:51:29.700Z",
      id: "1710021089700",
    },
    {
      content:
        "<p>Soy el fuego que arde tu piel, soy el agua que mata tu sed</p><h1>El castillo de la torre yo soy</h1>",
      createdAt: "2024-03-09T22:11:51.221Z",
      id: "1710022311221",
    },
    {
      content: "<p>Nueva tarea</p>",
      createdAt: "2024-03-09T22:12:49.729Z",
      id: "1710022369729",
    },
    {
      content: "<h1>Esta es la ultima tarea</h1>",
      createdAt: "2024-03-09T22:12:56.913Z",
      id: "1710022376913",
    },
    {
      content: "<p>Agregando mas tareas</p>",
      createdAt: "2024-03-09T22:13:38.317Z",
      id: "1710022418317",
    },
    {
      content: "<p>Nueva tarea...</p>",
      createdAt: "2024-03-09T22:14:45.065Z",
      id: "1710022485065",
    },
    {
      content: "<p>Se agregan nuevas cosas...</p>",
      createdAt: "2024-03-09T22:15:25.730Z",
      id: "1710022525730",
    },
    {
      content:
        "<img src=https://res.cloudinary.com/md-dlg/image/upload/v1710022995/n3rsvkto0gkz2gpacbln.webp />",
      createdAt: "2024-03-09T22:23:15Z",
      id: "1710022995788n3rsvkto0gkz2gpacbln",
    },
    {
      content:
        "<img src=https://res.cloudinary.com/md-dlg/image/upload/v1710022996/xvbcyatizyeau2c1nk9i.webp />",
      createdAt: "2024-03-09T22:23:16Z",
      id: "1710022996883xvbcyatizyeau2c1nk9i",
    },
    {
      content: "<p>Puedo agregar nuevas tareas</p>",
      createdAt: "2024-03-10T22:15:57.949Z",
      id: "1710108957949",
    },
    {
      content: "<h1>Agregando una nueva tarea</h1>",
      createdAt: "2024-03-10T22:22:24.711Z",
      id: "1710109344711",
    },
    {
      content: "<p>VES, AHI ESTABA LA CUESTION</p>",
      createdAt: "2024-03-10T22:22:36.624Z",
      id: "1710109356624",
    },
    {
      content: "<p>Agrego nuevas tareas</p>",
      createdAt: "2024-03-10T22:22:52.475Z",
      id: "1710109372475",
    },
    {
      content: "<p>Sin ningun problema</p>",
      createdAt: "2024-03-10T22:22:58.933Z",
      id: "1710109378933",
    },
    {
      content: "<p>Sin ningún problema</p>",
      createdAt: "2024-03-10T22:24:07.359Z",
      id: "1710109447359",
    },
    {
      content: "<p>Nueva tarea...</p>",
      createdAt: "2024-03-10T22:26:25.782Z",
      id: "1710109585782",
    },
    {
      content: "<p>Nueva tarea...</p>",
      createdAt: "2024-03-10T22:27:06.024Z",
      id: "1710109626024",
    },
    {
      content: "<p>Mamita</p>",
      createdAt: "2024-03-10T22:32:06.518Z",
      id: "1710109926518",
    },
    {
      content: "<p>Mamita</p>",
      createdAt: "2024-03-10T22:32:34.397Z",
      id: "1710109954397",
    },
    {
      content: "<p>Puedo agregar tareas</p>",
      createdAt: "2024-03-10T22:46:12.372Z",
      id: "1710110772372",
    },
    {
      content: "<p>cOSITAS RICAS</p>",
      createdAt: "2024-03-10T22:46:38.991Z",
      id: "1710110798991",
    },
    {
      content: "<p>Nuevo mas</p>",
      createdAt: "2024-03-10T22:52:44.599Z",
      id: "1710111164599",
    },
    {
      content: "<p>Me gusta esto</p>",
      createdAt: "2024-03-10T22:58:02.603Z",
      id: "1710111482603",
    },
    {
      content: "<p>Nueva tarea</p>",
      createdAt: "2024-03-10T22:58:44.556Z",
      id: "1710111524556",
    },
    {
      content: "<p>Listo papa</p>",
      createdAt: "2024-03-10T22:59:02.604Z",
      id: "1710111542604",
    },
    {
      content: "<p>Vos sabes</p>",
      createdAt: "2024-03-10T22:59:34.061Z",
      id: "1710111574061",
    },
    {
      content: "<p>Mejorando de a poco</p>",
      createdAt: "2024-03-10T22:59:49.622Z",
      id: "1710111589622",
    },
    {
      content:
        "<p>La otra forma sigue funcionando</p><h1>De maravilla</h1><h2>NO hay problemas</h2>",
      createdAt: "2024-03-10T23:00:04.718Z",
      id: "1710111604718",
    },
  ];

  async function addCookieHandler() {
    "use server";
    getAllNotes();
  }

  return (
    <form action={addCookieHandler} className="h-[500px] w-[500px] ">
      <button className="w-20 h-20">Agregar cookie de prueba</button>
    </form>
  );
};
