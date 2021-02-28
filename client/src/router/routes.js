const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'testServer', component: () => import('pages/testServer.vue') },
      { path: 'about', component: () => import('pages/About.vue') },
      { path: 'notes', component: () => import('pages/Notes.vue') },
      { path: 'moduls', component: () => import('pages/Moduls.vue') },
      { path: 'alumnes', component: () => import('pages/Alumnes.vue') },
      { path: 'asignatures', component: () => import('pages/Asignatures.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
