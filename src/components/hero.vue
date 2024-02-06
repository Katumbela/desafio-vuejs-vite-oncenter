<template>
    <div
        class=" bg-cover px-12 relative overflow-hidden bg-no-repeat bg-center h-[60vh] bg-[url('./assets/img2.jpeg')] flex  items-center">
        <div class="w-6/12">
            <div class="absolute inset-0 z-10 bg-black opacity-40"></div>

            <!-- Conteúdo a ser revelado -->
            <div class="absolute inset-0 z-20 flex px-10 text-center flex-col justify-center items-center text-white">

                <h1 class="hero-title text-6xl font-extra-bold text-">{{ title }}</h1>
                <br>
                <p class="hero-description font-light text-2xl">{{ description }}</p>
                <br>
                <a href="#paises" class="bg-green-400 text-white px-3 py-2 rounded-sm hover:bg-green-600 transition-all">Ver
                    tabela de casos</a>
            </div>
        </div>
        <div class="w-3/12">

        </div>
    </div>
</template>
  
<script>

export default {
    props: {
        title: String,
        description: String,
        img: String,
    }
}

</script>
  