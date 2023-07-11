import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    }
  ]
})
//Nav guards
router.beforeEach((to, from, next) => {
  //check for required AuthGuard
  console.log(to.matched.some(record => record.meta.requiresAuth))
  if(to.matched.some(record => record.meta.requiresAuth)){
    //check if not logged in
    if(!firebase.auth().currentUser){
      console.log('user not logged in and auth required')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
        //proceed to the route
    }  else {
      console.log('LOGGED IN AND USER FOUND')
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)){
            //check if user IS logged in
    if(firebase.auth().currentUser){
      //go to login page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
        
    }  else {
      //proceed to the route
      next()
    }
  } else {
        //proceed to the route
      next()
  }
})

export default router