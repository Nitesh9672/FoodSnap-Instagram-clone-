const middle = document.querySelector(".middle");
const mainContent = document.querySelector(".main-content-inner");
const likeCount = document.querySelector(".likesCount");

// const updateLike = (likesCount) => {
//   likeCount.innerText = likesCount;
// };

const updatePost = (data) => {
  console.log(data);
  mainContent.innerHTML = "";
  let str = "";
  data.data.forEach((d) => {
    str += `  <div class="postCard">
              <div class="postCard-inner">
                <div class="user-detail">
                  <div class="user-profile-container">
                    <img
                      src="data:image/png;base64,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"
                      alt=""
                      class="user-profile"
                    />
                  </div>
                  <h3 class="user-name">${d.username}</h3>

                </div>
                <div class="post-title">
                  <h2>${d.title}</h2>
                </div>
                <div class="post-image">
                  <img src="${d.imageURL}" alt="" />
                </div>
                <div class="user-interaction">
                 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-heart-fill heart-icon likes-interaction"
                      viewBox="0 0 16 16"
                       id=${d._id}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  
                     
                   

                 
                  <div class="comment-interaction">
                    <a href="/posts/showComment?id=${d._id}"><img
                        class="myicon"
                        src="/utilities/photos/comment-png.png"
                        alt="comment"
                      /></a>

                  </div>
                </div>
                 <div class="likesCount">${d.likeCount}</div>
                <div class="post-caption">
                  <h4>${d.caption}</h4>
                </div>
               
                  <div class="comment-count"><a
                      href="/posts/showComment?id=${d._id}"
                    ><p>View all
                        ${d.commentCount}
                        Comments</p></a></div>
                
                <button class="deletePost" id=${d._id}>Delete</button>
                <a
                  class="updatePost"
                  id=${d._id}
                  href="/posts/updatePost?id=${d._id}"
                >Update</a>

                <div class="comment-form-card">
                  <form action="/posts/addComment" method="post">
                    <input
                      type="text"
                      class="hidden"
                      value="${d._id}"
                      name="post_id"
                    />
                    <div class="flex-row">

                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        class="comment"
                        placeholder="Add a comment..."
                      />
                      <button type="submit">Post</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
`;
    mainContent.innerHTML = str;
  });
};
middle.addEventListener("click", (e) => {
  // if (e.target.farthestViewportElement.classList[3] == "likes-interaction") {
  //   let idAtr = e.target.farthestViewportElement.id;
  //   e.target.innerText += 1;

  //   console.log(e.target);
  //   console.log(idAtr);
  //   axios
  //     .post("/posts/getLikes", {
  //       idAtr,
  //     })
  //     .then((likesCount) => {
  //       e.target.farthestViewportElement.classList.addClass("like");
  //       updateLike(likesCount);
  //     })
  //     .catch((err) => console.log(err));
  // } else {
  let classAttribute = e.target.attributes.class.value;
  let idAttribute = e.target.attributes.id.value;
  console.log(classAttribute);
  console.log(idAttribute);
  if (classAttribute == "deletePost") {
    axios
      .post("/posts/deletePost", {
        idAttribute,
      })
      .then((data) => {
        updatePost(data);
      })
      .catch((err) => console.log(err));
  }
});
