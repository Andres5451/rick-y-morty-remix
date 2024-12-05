import type {LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import appStylesHref from "../styles.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStylesHref },
];


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
    const character = await response.json();
    return json({ character });
};

export default function CharacterDetail() {
    const { character } = useLoaderData<typeof loader>();

    return (
        <div className="character-detail">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p><strong>Raza:</strong> {character.species}</p>
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Origen:</strong> {character.origin.name}</p>
        </div>
    );
}
