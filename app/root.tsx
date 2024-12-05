import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink, Outlet } from "@remix-run/react";
import appStylesHref from "./estilos.css"; 

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return json({ characters: data.results });
  } catch (error) {
    console.error(error);
    return json({ characters: [] });
  }
};

export default function App() {
  const { characters } = useLoaderData<typeof loader>();

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app">
          <div id="sidebar">
            <h1>Rick and Morty</h1>
            <nav>
              <ul>
                {characters.map((character: any) => (
                  <li key={character.id}>
                    <NavLink to={`/character/${character.id}`}>
                      {character.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div id="detail">
            <Outlet />
          </div>
        </div>
      </body>
    </html>
  );
}
