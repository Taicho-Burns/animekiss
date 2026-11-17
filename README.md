# animekiss

アニメの検索、人気作品の閲覧、クイズが楽しめるアニメ情報サイトです。専門学校1年次（2024年）に、初めて本格的に作ったWebシステムです。

## 主な機能

- **アニメ検索**：作品名で検索すると、英語・日本語タイトル、ジャンル、放送年、あらすじ、画像を表示します。データは [AniList API](https://docs.anilist.co/)（GraphQL）からリアルタイムで取得しています。
- **最新作品カード**：「チェンソーマン」「SPY×FAMILY」「進撃の巨人」などのカードをクリックすると、作品の詳細をダイアログで表示します。
- **アニメクイズ**：MySQLに保存した問題をPHPでJSONとして返し、JavaScriptで4択クイズとして表示します。
- **レスポンシブ対応**：タブレットやスマートフォンでは、ハンバーガーメニューとそれぞれの画面に合わせたレイアウトに切り替わります。

## 使用技術

| 区分 | 技術 |
|------|------|
| フロントエンド | HTML5, CSS3, JavaScript（Fetch API, async/await） |
| バックエンド | PHP（mysqli） |
| データベース | MySQL |
| 外部API | AniList API（GraphQL） |

## ファイル構成

```
animekiss/
├── README.md
└── Animekiss/
    ├── animekiss.html      # メインページ
    ├── app.js              # メニュー・検索・API通信・クイズ処理
    ├── get_questions.php   # MySQLからクイズ問題を取得しJSONで返す
    ├── images/             # 作品カード用の画像（タイトル入りのプレースホルダー）
    └── styles/
        └── styles.css
```

## 仕組み

1. 作品カードのクリックや検索を行うと、`fetchAnimeData()` が `https://graphql.anilist.co` にGraphQLのリクエストを送ります。最も一致する作品が `<dialog>` に表示されます。
2. 「Anime Quiz」ボタンを押すと、`get_questions.php` が `questions` テーブルの全問題をJSONで返します。JavaScriptがそのデータから回答ボタンを作成します。

## ローカルでの実行方法

[XAMPP](https://www.apachefriends.org/) など、PHP と MySQL が使える環境が必要です。

1. このリポジトリをダウンロード（またはクローン）します。
2. XAMPP で MySQL を起動し、データベースを作成します。

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
4. リポジトリのフォルダでターミナルを開き、`Animekiss` フォルダを公開ルートにしてPHPの組み込みサーバーを起動します（XAMPPの場合、`php` は `C:\xampp\php\php.exe` にあります）。

```bash
php -S localhost:8000 -t Animekiss
```

5. ブラウザで `http://localhost:8000/animekiss.html` を開きます。

> CSSの画像パスがサイトのルート（`/images/...`）を基準にしているため、`Animekiss` フォルダを公開ルートにして起動してください。

> **APIの変更について**：当初使用していた Jikan API の公開サーバーが2026年10月1日に提供を終了したため、2026年11月に AniList API へ切り替えました。

## 学んだこと

- `fetch` と `async/await` を使ったREST APIの呼び出し方とエラー処理
- JSONを介した、JavaScript（フロントエンド）とPHP/MySQL（バックエンド）の連携
- Flexbox、Grid、メディアクエリを使ったレスポンシブデザイン

## 振り返り：今ならこう改善する

現在はネットワークセキュリティを専攻しています。その視点で当時のコードを見直すと、次の点を改善したいと考えています。

- **XSS対策**：APIから取得したデータを `innerHTML` でそのまま表示しています。`textContent` を使うか、エスケープ処理を行うべきでした。
- **クイズの正解がブラウザから見える**：`correct_answer` をクライアントに送っているため、開発者ツールで正解が分かってしまいます。正誤判定はサーバー側で行うべきです。
- **認証情報の管理**：DB接続情報はソースコードに直接書かず、環境変数やGit管理外の設定ファイルで管理すべきです。
- **URLエンコード**：Jikan版では検索語をそのままURLに含めていました。`encodeURIComponent()` でエンコードすべきでした（AniList版では検索語をGraphQLの変数として送るため、この問題はなくなりました）。
- **コード品質**：`app.js` に重複した処理があります。また、「Next」ボタンで次の問題に進まず、問題を再読み込みしてしまう不具合もあります。リファクタリングが必要です。
- **外部APIへの依存**：利用していたAPIが提供終了したことで、主要機能が動かなくなりました。外部サービスが使えなくなった場合の対策（キャッシュや代替APIへの切り替え）も設計時に考慮すべきだと学びました。実際に、2026年11月に代替APIへ切り替えました。

---

データ提供：[AniList](https://anilist.co/)。作品カードの画像は、著作権に配慮してタイトル入りのプレースホルダーに差し替えています。アニメのタイトル・画像の権利は各権利者に帰属します。本プロジェクトは学習目的で作成したものです。
