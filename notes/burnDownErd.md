```mermaid
erDiagram

    USERS {
        int id PK "ユーザーID"
        string name "名前"
        string email "メールアドレス"
        string password_hash "ハッシュ化されたパスワード"
    }

    TASKS {
        int id PK "タスクID"
        int project_id FK "プロジェクトID"
        string title "タイトル"
        string status "タスクの進捗状態(TODO,DOING,DONE)"
        int point "想定工数"
    }

    PROJECTS {
        int id PK "プロジェクトID"
        int user_id FK "ユーザーID"
        string name "プロジェクト名"
        date start_date "開始日"
        date end_date "終了日"
    }

    %% リレーション定義
    PROJECTS ||--o{ TASKS : "含む"
    USERS ||--o{ PROJECTS : "管理する"