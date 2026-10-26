# animekiss

アニメの検索、人気作品の閲覧、クイズが楽しめるアニメ情報サイトです。専門学校1年次（2024年）に、初めて本格的に作ったWebシステムです。

## 主な機能

- **アニメ検索**：作品名で検索すると、英語・日本語タイトル、ジャンル、放送年、あらすじ、画像を表示します。データは [Jikan API](https://jikan.moe/)（MyAnimeList の非公式API）からリアルタイムで取得しています。
- **最新作品カード**：「チェンソーマン」「SPY×FAMILY」「進撃の巨人」などのカードをクリックすると、作品の詳細をダイアログで表示します。
- **アニメクイズ**：MySQLに保存した問題をPHPでJSONとして返し、JavaScriptで4択クイズとして表示します。
- **レスポンシブ対応**：タブレットやスマートフォンでは、ハンバーガーメニューとそれぞれの画面に合わせたレイアウトに切り替わります。

## 使用技術

| 区分 | 技術 |
|------|------|
| フロントエンド | HTML5, CSS3, JavaScript（Fetch API, async/await） |
| バックエンド | PHP（mysqli） |
| データベース | MySQL |
| 外部API | Jikan API v4 |

## ファイル構成

```
animekiss/
├── index.html          # メインページ
├── app.js              # メニュー・検索・API通信・クイズ処理
├── get_questions.php   # MySQLからクイズ問題を取得しJSONで返す
└── styles/
    └── styles.css
```

## 仕組み

1. 作品カードのクリックや検索を行うと、`fetchAnimeData()` が `https://api.jikan.moe/v4/anime?q=...` にリクエストを送ります。最初の検索結果が `<dialog>` に表示されます。
2. 「Anime Quiz」ボタンを押すと、`get_questions.php` が `questions` テーブルの全問題をJSONで返します。JavaScriptがそのデータから回答ボタンを作成します。

## ローカルでの実行方法

[XAMPP](https://www.apachefriends.org/) など、Apache + PHP + MySQL が使える環境が必要です。

1. プロジェクトフォルダを `htdocs/` に配置します。
2. Apache と MySQL を起動し、データベースを作成します。

```sql
CREATE DATABASE anime_quiz;
USE anime_quiz;

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer1 VARCHAR(255) NOT NULL,
  answer2 VARCHAR(255) NOT NULL,
  answer3 VARCHAR(255) NOT NULL,
  answer4 VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(255) NOT NULL
);

INSERT INTO questions (question, answer1, answer2, answer3, answer4, correct_answer) VALUES
('調査兵団が登場するアニメはどれ？', 'ブラッククローバー', '進撃の巨人', 'SPY×FAMILY', 'WIND BREAKER', '進撃の巨人');
```

3. `get_questions.php` に、ご自身のMySQLのユーザー名とパスワードを設定します。
4. ブラウザで `http://localhost/animekiss/` を開きます。

> **注意**：Jikan APIの公開サーバーは2026年に提供を終了したため、現在は検索機能と作品詳細の表示が動作しません。クイズ機能はローカル環境で動作します。

## 学んだこと

- `fetch` と `async/await` を使ったREST APIの呼び出し方とエラー処理
- JSONを介した、JavaScript（フロントエンド）とPHP/MySQL（バックエンド）の連携
- Flexbox、Grid、メディアクエリを使ったレスポンシブデザイン

## 振り返り：今ならこう改善する

現在はネットワークセキュリティを専攻しています。その視点で当時のコードを見直すと、次の点を改善したいと考えています。

- **XSS対策**：APIから取得したデータを `innerHTML` でそのまま表示しています。`textContent` を使うか、エスケープ処理を行うべきでした。
- **クイズの正解がブラウザから見える**：`correct_answer` をクライアントに送っているため、開発者ツールで正解が分かってしまいます。正誤判定はサーバー側で行うべきです。
- **認証情報の管理**：DB接続情報はソースコードに直接書かず、環境変数やGit管理外の設定ファイルで管理すべきです。
- **URLエンコード**：検索語は `encodeURIComponent()` でエンコードしてからURLに含めるべきです。
- **コード品質**：`app.js` に重複した処理があります。また、「Next」ボタンで次の問題に進まず、問題を再読み込みしてしまう不具合もあります。リファクタリングが必要です。
- **外部APIへの依存**：利用していたAPIが提供終了したことで、主要機能が動かなくなりました。外部サービスが使えなくなった場合の対策（キャッシュや代替APIへの切り替え）も設計時に考慮すべきだと学びました。

---

データ提供：[Jikan API](https://jikan.moe/)。アニメのタイトル・画像の権利は各権利者に帰属します。本プロジェクトは学習目的で作成したものです。
