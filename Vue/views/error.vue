<script src="@/controllers/error"></script>

<template>
    <div>
        <div class="wrapper main main-error">
           <div class="container-error">
               <div class="c--img"></div>
               <div class="c--error">
                    <div class="content">
                    <!-- // ~ balise h1 + h2 pour contenus court et span ( contenu dans h1&h2) pour contenu plus long <!> font plus petite -->
                        <h1> 404
                            <!-- <span> Page indisponible </span>  -->
                        </h1> 
                    
                        <h2> Error
                            <!-- <span> Page indisponible </span>  -->
                        </h2>
                        <p>I tried to catch some sand, but I lost myself</p>
                        <!-- <p>La page ou l'événement que vous recherchez est introuvable. Nous vous invitons à retourner à l'accueil.</p>  -->
                        <a @click="goBack()">back to home</a>
                    </div>
               </div>
               <div class="c--logo">

               </div>
           </div>
        </div>
           
    </div>
</template>