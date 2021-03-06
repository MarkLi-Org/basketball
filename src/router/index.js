import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const getIndexView = () => import('../views/index')
const getGamesView = () => import('../views/games')
const getTestView = () => import('../views/test')

export function createRouter(){
	return new VueRouter({
		mode: 'history',
		routes: [{
			path: '/',
			redirect: 'index'
		},{
			name: 'index',
			path: '/index',
			component: getIndexView
		},{
			name: 'test',
			path: '/test',
			component: getTestView
		},{
			name: 'games',
			path: '/games',
			component: getGamesView
		}]
	})
}