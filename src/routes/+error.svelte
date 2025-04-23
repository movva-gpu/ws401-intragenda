<script>
   	import { page } from '$app/state';
    import Breadcrumb from '../lib/components/Breadcrumb.svelte';

    const messages = {
        400: "Requête incorrecte ou mal formée",
        401: "Permission non accordée",
        402: "Paiement requis",
        403: "Accès interdit",
        404: "Ressource introuvable",
        405: "Méthode interdite",
        406: "Requête non-acceptable",
        408: "Temps d'attente écoulé",
        410: "Ressource indisponible/supprimée",
        411: "<code>Content-Length</code> requis",
        412: "Le serveur ne rempli pas les conditions préalables",
        413: "Informations trop volumineuses",
        414: "URI/URL trop longue",
        415: "<code>Content-Type</code> non supporté",
        416: "<code>Range</code> non satisfaite",
        417: "<code>Expect</code> échouée",
        418: "Je suis une théière. Sérieusement, comment avez-vous pu en arriver là ?",
        500: "Erreur serveur",
        501: "Non implémenté / TODO",
        502: "Chemin malformé",
        503: "Service indisponible",
        504: "Temps d'attente de la passerelle dépassé",
        505: "Version HTTP non supportée"
    };

    const msg = messages[page.status] || `<code>${page.error.message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }</code>`;
</script>

<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: page.status.toString() }]} />
<div class="error">
    <h1>{page.status}</h1>
    <p>
        {@html msg}{!msg.endsWith('.') ? '.' : ''}
        <br>
        <a href="/">Retourner à l'accueil</a>
    </p>
</div>

<style lang="scss">
    @use '$lib/globals';
    @use '$lib/mixins';
    @use 'sass:color';

    .error {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;

        :global(code) {
            display: inline-block;
            font-family: monospace;
            font-size: 1.2rem;
            color: globals.$cl-title;
            background-color: #ddd;
            padding: globals.$sz-xxxs globals.$sz-xs;
            border-radius: globals.$sz-xs;
        }
    }


    h1 {
        margin-bottom: globals.$sz-xs;

        font-size: 30rem;
        font-weight: 900;

        color: transparent;

        $cl-dg: color.adjust($color: globals.$cl-iut, $space: oklch, $lightness: 6%, $chroma: -6%);
        background:
            repeating-linear-gradient(
                45deg,
                $cl-dg,
                $cl-dg 10px,
                transparent 10px,
                transparent 20px
            );
        @include mixins.background-clip(text);

        user-select: none;
    }

    p {
        font-size: 1.5rem;
        color: globals.$cl-text;
        text-align: center;
        a {
            font-size: 0.8em;
            color: inherit;
        }
    }
</style>
