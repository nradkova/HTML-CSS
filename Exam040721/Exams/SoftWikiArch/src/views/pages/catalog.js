import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getAll} from '../../api/data.js';


const catalogTemplate = (articles) => html`  
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${articles.length>0
    ? html`${articles.map(articleTemplate)}`
    : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const articleTemplate = (article) => html` 
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export default async function catalogView(context) {
    const articles = await getAll();
    context.render(catalogTemplate(articles));
}


//catalog - pagination
// import { html } from '../../node_modules/lit-html/lit-html.js'
// import { getAllWithPadination, getAllCount } from '../api/data.js';


// const catalogTemplate = (articles, page, pages) => html`  
// <section id="catalog-page" class="content catalogue">
//     <h1>All Articles</h1>
//     <div> Page ${page} / ${pages}
//         ${page > 1 ? html`<a href="/catalog?page=${page - 1}">&lt; Prev</a>` : ''}
//         ${page < pages ? html` <a href="/catalog?page=${page + 1}"> Next &gt;</a>` : ''}

//     </div>
//     ${articles.length > 0
//         ? html`${articles.map(articleTemplate)}`
//         : html`<h3 class="no-articles">No articles yet</h3>`}
// </section>`;

// const articleTemplate = (article) => html` 
// <a class="article-preview" href="/details/${article._id}">
//     <article>
//         <h3>Topic: <span>${article.title}</span></h3>
//         <p>Category: <span>${article.category}</span></p>
//     </article>
// </a>`;

// export default async function catalogView(context) {
//     const page = Number(context.querystring.split('=')[1]) || 1;
//     const count = await getAllCount();
//     const pages = Math.ceil(count / 3);
//     const articles = await getAllWithPadination(page);
//     context.render(catalogTemplate(articles, page, pages));
// }