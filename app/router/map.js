export default {
	'/main': {
		meta: { title: 'Task Manager' },
		component: (resolve) => {
			require(['pages/main'], resolve)
		}
	}
}