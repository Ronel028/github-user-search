
let searchUser = document.querySelector('#searchButton');
let inputUser = document.querySelector('input[type="text"]');


//search user by clicking button key
searchUser.addEventListener('click', async ()=>{

     if(inputUser.value === '' || inputUser.value === undefined){
          alert('Please Enter valid username');
          return;
     }
     else{
          let fetchingData = await fetch(`/userInfo/${inputUser.value}`);
          let serverResponse = await fetchingData.json();
          
          if(inputUser.value != serverResponse.login){
               alert('User not found, possibly due to incorrect spelling or because the user does not exist on github.');
               inputUser.value = '';
               return;
          }
          else{
              githubUser(serverResponse); 
              inputUser.value = '';
          }
     }
})

//search user by clicking enter key in keyboard
inputUser.addEventListener("keyup", async(e)=>{
     if (e.keyCode === 13) {
          e.preventDefault();

          if(inputUser.value === '' || inputUser.value === undefined){
               alert('Please Enter valid username');
               return;
          }
          else{
               let fetchingData = await fetch(`/userInfo/${inputUser.value}`);
               let serverResponse = await fetchingData.json();

               if(inputUser.value != serverResponse.login){
                    alert('User not found, possibly due to incorrect spelling or because the user does not exist on github.');
                    inputUser.value = '';
                    return;
               }
               else{
                   githubUser(serverResponse); 
                   inputUser.value = '';
               }
          }
     }
  });

//funtion for get githubuser from api and display in browser
let githubUser = (user)=>{

     //initialization
     let profileImage = document.querySelector('[data-profile-image]');
     let name = document.querySelector('[data-name]');
     let joinDate = document.querySelector('[data-join-date]')
     let bio = document.querySelector('[data-bio]');
     let repositories = document.querySelector('[data-repo]');
     let followers = document.querySelector('[data-followers]')
     let following = document.querySelector('[data-following]')
     let location = document.querySelector('[data-location]')
     let blog = document.querySelector('[data-blog]')
     let twitter = document.querySelector('[data-twitter]')
     let company = document.querySelector('[data-company]')

     profileImage.src = user.avatar_url;
     user.name === null ? name.textContent = 'Not Available' : name.textContent = user.name;
     const dateJoin = new Date(user.created_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
     joinDate.textContent = dateJoin;
     user.bio === null ? bio.textContent = 'Bio : Not Available' : bio.textContent = user.bio;
     repositories.textContent = user.public_repos;
     followers.textContent = user.followers;
     following.textContent = user.following;
     user.location === null ? location.textContent = 'Not Available' : location.textContent = user.location;
     (user.blog === null || user.blog === "") ? blog.textContent = 'Not Available' : blog.textContent = user.blog;
     user.twitter_username === null ? twitter.textContent = 'Not Available' : twitter.textContent = user.twitter_username;
     user.company === null ? company.textContent = 'Not Available' : company.textContent = user.company;
}