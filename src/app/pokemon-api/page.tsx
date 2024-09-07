"use client";

import { Grid } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";

export default function Home() {
    return (
        <Grid
            columns={["Pokemon", "URL"]}
            search={true}
            pagination={{
                limit: 10,
                server: {
                    url: (prev, page, limit) =>
                        `${prev}?limit=${limit}&offset=${page * limit}`,
                },
            }}
            server={{
                url: "https://pokeapi.co/api/v2/pokemon",
                then: (data) =>
                    data.results.map((pokemon: any) => [
                        pokemon.name,
                        html(
                            `<a href='${pokemon.url}'>Link to ${pokemon.name}</a>`
                        ),
                    ]),
                total: (data) => data.count,
            }}
        />
    );
}
