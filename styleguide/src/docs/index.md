---
title: TIPS_ROOM.js スタイルガイド
---
# HTML命名規則

- 基本的には**BEM**
- BlockやModifer、Element内で**複数単語がある場合はキャメルケース**を用いる。（ 例：blockLevel-elemChild ）
- 2018年7月現在ではElementまでの命名を必要とするほど要素の複雑な箇所はないので、実質**Block__modifer**までと考えていただいてよい

## 例
基本形
	
	<li class="panel">
		<a class="panel__wrap" href="post.html">
			<h2 class="panel__index">
				要素からclassの追加/削除を行う
			</h2>
			<ul class="panel__tags">
				<li>aaa</li>
				<li>aaa</li>
				<li>aaa</li>
				<li>aaa</li>
			</ul>
		</a>
	</li>

「panel」のように、複数が連続する場合、親要素は「.panels」など複数形とする

	<ul class="panels">	
		<li class="panel">
			<a class="panel__wrap" href="post.html">
				<h2 class="panel__index">
					要素からclassの追加/削除を行う
				</h2>
				<ul class="panel__tags">
					<li>aaa</li>
					<li>aaa</li>
					<li>aaa</li>
					<li>aaa</li>
				</ul>
			</a>
		</li>
		<li class="panel">
			<a class="panel__wrap" href="post.html">
				<h2 class="panel__index">
					要素からclassの追加/削除を行う
				</h2>
				<ul class="panel__tags">
					<li>aaa</li>
					<li>aaa</li>
					<li>aaa</li>
					<li>aaa</li>
				</ul>
			</a>
		</li>		
	</ul>

CSSで要素の状態を部分的に変化させる場合、classを追記する。
その際、ハイフンから始めることで状態・ステータスのみを操作するクラスだとわかりやすくする

		/**
		* 色付きリスト
		*/
		<ul class="-colordots">
			<li>あああ</li>
			<li>あああ</li>
			<li>あああ</li>
			<li>あああ</li>
			<li>あああ</li>
		</ul>

		/**
		* 下線
		*/
		<span class="-underline">class="-underline"</span>

		/**
		* マーカー下線
		*/
		<span class="-marker">class="-marker"</span>

		/**
		* テキスト align 
		*/
		<p class="-textcentering">
			class="-textcentering"
		</p>
		<p class="-textright">
			class="-textright"
		</p>
		<p class="-textleft">
			class="-textleft"
		</p>