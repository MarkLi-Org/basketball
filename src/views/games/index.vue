<template>
	<div id="container">
		<div class="tabs">
			<div class="tab" :class="{'active': index == 0}" @click="slideTo(0)">进行中</div>
			<div class="tab" :class="{'active': index == 1}" @click="slideTo(1)">已完成</div>
		</div>
		<div id="pageWrapper">
			<div id="pageScroller">
				<div id="doingWrapper" class="wrapper game-page">
					<div class="scroller" ref="doingScroller">
						<p v-for="(item, index) in items">{{index}}-----{{index}}----{{index}}</p>
					</div>
				</div>
				<div id="doneWrapper" class="wrapper game-page">
					<div class="scroller" ref="doneScroller">
						<p v-for="(item, index) in items">{{index}}----{{index}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tab from './tab'
	import Scroll from 'com/scroll'
	import { requestAnimationFrame, cancelAnimationFrame } from 'utils/raf'

	var hScroll,
		vScrolls = {}

	export default {
		data(){
			return {
				index: 0
			}
		},
		computed: {
			items(){
				var items = [];
				items.length = 200;
				return items.fill(200);
			},
			doingScroller(){
				return this.$refs.doingScroller;
			},
			doneScroller(){
				return this.$refs.doneScroller;
			}
		},
		components: { tab },
		mounted(){
			vScrolls.doingScroll = new Scroll('#doingWrapper', {
				vertical: true,
				slide: true,
				max: 0,
				min: window.innerHeight - this.doingScroller.clientHeight - G.size * 1.2,
				name: 'doingScroll'
			});

			vScrolls.doneScroll = new Scroll('#doneWrapper', {
				slide: true,
				vertical: true,
				max: 0,
				min: window.innerHeight - this.doneScroller.clientHeight - G.size,
				name: 'doneScroll'
			});

			hScroll = new Scroll('#pageWrapper', {
				max: 0,
				noOutOfBounds: true,
				min: -window.innerWidth,
				step: window.innerWidth,
				name: 'hScroll'
			});

			var self = this;
			hScroll.on('move', function(){
				let position = this.getPosition();
				let X = Math.abs(position.X);
				self.index = Math.round(X / window.innerWidth);
			})
			.on('moveEnd', function(){
				self.index = this.getIndex();
			})
		},
		methods: {
			slideTo(index){
				if(this.index == index) return;
				this.index = index;
				hScroll.slideTo(index, 600)
			}
		}
	}
</script>

<style scoped>
	.tabs { display: flex; position: relative; }
	.tab { flex: 1; text-align: center; height: 1rem; line-height: 1rem; border-bottom: 1px solid #ccc; }
	.tab.active { color: #00BFFF; border-bottom: 4px solid #00BFFF; }

	#pageWrapper { overflow: hidden; }
	#pageScroller { display: flex; }
	.game-page { width: 100%; height: 100%; flex-shrink: 0; text-align: center; }

	.wrapper { overflow: hidden; }
	.scroller { transform: translateZ(0); }

</style>