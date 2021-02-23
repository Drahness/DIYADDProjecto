<template>
  <q-page class="$secondary window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h1>Header</h1>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <div> This is the about lol</div>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Registre" @click="validate" />
                                                                                                <!-- This is put in methods, not computed-->
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
    <!--        <p class="text-grey-6">No estas registrat? <a href="#/registro">Registra't</a></p> -->
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
