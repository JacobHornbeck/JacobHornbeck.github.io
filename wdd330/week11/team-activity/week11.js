import Auth from "./auth.js"
import { makeRequest } from "./authHelper.js"

const auth = new Auth()

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault()
    auth.login(loadPosts)
})


async function loadPosts() {
    try {
        const posts = await makeRequest("posts", "GET", null, auth.token)
        const postList = document.querySelector('#post-list')
        postList.innerHTML = ""

        document.querySelector(".jwt-posts").classList.remove("hidden")

        posts.map(post => {
            const postItem = document.createElement('li')
            const postContent = document.createTextNode(post.content)

            postItem.appendChild(postContent)
            postList.appendChild(postItem)
        })
    }
    catch (error) {
        console.log(error)
    }
}


document.querySelector('#postSubmit').addEventListener('click', (e) => {
    e.preventDefault()
    addPost()
})

async function addPost() {
    try {
        const res = await makeRequest('posts', 'POST', { content: document.querySelector('#post-content').value }, auth.token);
        loadPosts();
    }
    catch (error) {
        console.log(error)
    }
}
