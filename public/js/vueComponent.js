//
const localhost = "http://localhost:8000";

// 导航栏组件
Vue.component('navigation', {
	template: '<nav class="top-bar" data-topbar><ul class="title-area"><li class="name"><h1><a href="#">{{navigation.name}}</a></h1></li><li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li></ul><section class="top-bar-section" ><ul class="left" ><li v-for="title in navigation.title"><a :href="title.href">{{title.name}}</a></li></ul></section><section class="top-bar-section"><ul class="right"><li><a :href="usersName.href">{{usersName.name}}</a></li><li @click="logout()"><a>注销</a></li></ul></section></nav>',
	data(){
		return {
			'navigation': {
			'name': '图书管理系统',
			'active': 'home',
			'title': [
						{
							'name': 'Home',
							'href': 'http://localhost:8000/home.html'
						},
						{
							'name': '借阅',
							'href': 'http://localhost:8000/home.html'
						},
						{
							'name': '还书',
							'href': 'http://localhost:8000/bookReturn.html'
						},
						{
							'name': '清单',
							'href': 'http://localhost:8000/bookAccount.html'
						}
					],
			}
		}
	},
	methods: {
		logout: function(){ // 注销
			Cookies.remove('usersName');
			Cookies.remove('usersID');
			window.location.href = "http://localhost:8000/login"
		}
	},
	computed: {
		usersName: function(){
			let usersName = Cookies.get('usersName')
			if(usersName == undefined) {
				return {
					'name': '登陆',
					'href': 'http://localhost:8000/login.html'
				};
			} else {
				return {
					'name': usersName,
					'href': ''
				};
			}
		}
	}
})

// 单个图书组件
Vue.component('book', {
	template: '<div class="small-5 columns panel"><div class="small-4 columns"><a href=""class="th"><img src="img/a123.jpg"alt="Paris"></a></div><div class="small-8 columns"><h5><b>{{book.book_name}}<small>&nbsp{{book.book_id}}</small></b></h5><h6>{{book.book_author}}</h6><h6>图书介绍</h6><button class="button tiny"style="float: right;"@click="take()">借阅</button></div></div>',
	props: ['book'],
	data(){
		return {
			'button': ''
		}
	},
	methods: {
		take: function(){
			let date = new Date();
			let time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(); 
			console.log(Cookies.get('usersID'), "   ", this.book.book_id, "  ", time)
			if(Cookies.get('usersID') == undefined) {
				alert('请先登录')
				return;
			}

			axios.post(localhost+'/usersBook',{
				'usersID': parseInt(Cookies.get('usersID')),
				'bookID': this.book.book_id,
				'way': 'insert',
				'date': time
			},{'contentType':'application/json'})
			.then(function(response) {
				let data = response.data
	        	if (data == 'OK') {
	        		alert('借阅成功')
	        	} else if(data == false){
	        		alert('借阅失败, 已经借阅')
	        	}
	        })
	        .catch(function(error) {
	          console.log(error);
	        })
	    },
	}
});

// 多个图书组件
Vue.component('books', {
	template:'<div><template v-for="(book, index) in books"><book v-bind:book="book"></book><div class="small-2 columns"v-if="index % 2 == 0">&nbsp</div></template></div>',
	methos: {

	},
	props:['books'],
	data(){
		return {
			
		}
	},
	methods:{
		
	},
	created(){
	},
	watch: {

	}
})

