import { html } from '../../../node_modules/lit-html/lit-html.js'
import { getOneById, delOne } from '../../api/data.js';


const detailsTemplate = (article, isOwner, onDelete) => html`  
<section id="details-page" class="content details">
    <h1>${article.title}</h1>
    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>
        <div class="buttons">
            ${isOwner
                 ? html`<a href="/edit/${article._id}" class="btn edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                        <a href='/home' class="btn edit">Back</a>`
                 : html`<a href='/home' class="btn edit">Back</a>`}
        </div>
    </div>
</section>`;

export default async function detailsView(context) {
    const articleId = context.params.id;
    const article = await getOneById(articleId);
    const isOwner=context.user&&context.user._id==article._ownerId;

    context.render(detailsTemplate(article,isOwner,onDelete));
 
    async function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure?');
        if (!confirmed) {
            return;
        }
        delOne(articleId)
        context.page.redirect('/home')
    }
}

//details - likes
// import { html } from '../../../node_modules/lit-html/lit-html.js'
// import { getOneById, delOne, postLike, getLikes, checkUserLiked } from '../../api/data.js';


// const detailsTemplate = (pet, isOwner, onDelete, onLike, canLike, likesCount) => html`  
// <section id="details-page" class="details">
//     <div class="pet-information">
//         <h3>Name: ${pet.name}</h3>
//         <p class="type">Type: ${pet.type}</p>
//         <p class="img"><img src=${pet.imageUrl}></p>
//         <div class="actions">
//             ${isOwner 
//                 ? html`<a class="button" href="/edit/${pet._id}">Edit</a>
//                         <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
//                 : ''}
                
//             <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
//             ${canLike
//                 ? html`<a @click=${onLike} id="likeBtn" class="button" href="javascript:void(0)">Like</a>`
//                 : ``}

//             <!-- ( for Guests and Users )  -->
//             <div class="likes">
//                 <img class="hearts" src="/images/heart.png">
//                 <span id="total-likes">Likes: ${likesCount}</span>
//             </div>
//         </div>
//     </div>
//     <div class="pet-description">
//         <h3>Description:</h3>
//         <p>${pet.description}</p>
//     </div>
// </section>`;

// export default async function detailsView(context) {
//     const petId = context.params.id;
//     const userId = sessionStorage.getItem('userId');
//     const pet = await getOneById(petId);
//     let likesCount = await getLikes(petId);
//     console.log(likesCount)
//     let canLike=false;

//     if(userId==null){
//         return  context.render(detailsTemplate(pet,false, onDelete, onLike, canLike, likesCount));
//     }else if(userId==pet._ownerId){
//         context.render(detailsTemplate(pet,true, onDelete, onLike, canLike, likesCount));
//     }else{
//         canLike = await checkUserLiked(petId, userId);
//         context.render(detailsTemplate(pet,false, onDelete, onLike, canLike, likesCount));
//     }
    
//     async function onDelete(event) {
//         event.preventDefault();
//         const confirmed = confirm('Are you sure?');
//         if (!confirmed) {
//             return;
//         }
//         delOne(petId)
//         context.page.redirect('/catalog')
//     }
//     async function onLike() {
//         await postLike(petId);
//         canLike = false;
//         likesCount ++;
//         context.render(detailsTemplate(pet, false, onDelete, onLike, canLike, likesCount));
//     }
// }