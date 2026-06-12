-- ロビー（勉強部屋）テーブルの作成
-- メンバー一覧・チャットは Supabase Realtime の presence / broadcast で扱うため
-- 永続化するのはロビー本体のみ。

create table if not exists public.lobbies (
    lobby_id uuid primary key default gen_random_uuid(),
    -- ロビー名（schemas/index.ts の lobbyNameSchema に対応: 2〜15文字）
    lobby_name text not null,
    -- 勉強開始時刻
    start_time timestamptz not null,
    -- 勉強時間（分）（studyMinSchema に対応: 5〜60分）
    study_min smallint not null,
    -- 休憩時間（分）（breakMinSchema に対応: 1〜15分）
    break_min smallint not null,
    -- 非公開フラグ
    is_private boolean not null default false,
    -- 校内限定フラグ
    is_in_school boolean not null default false,
    -- 現在の参加人数
    member_count integer not null default 0,
    -- 最終アクティビティ時刻（参加・退出時に更新）
    last_activity_at timestamptz not null default now(),
    -- 作成時刻（一覧の並び替えに使用）
    created_at timestamptz not null default now(),

    constraint lobbies_lobby_name_length check (char_length(lobby_name) between 2 and 15),
    constraint lobbies_study_min_range check (study_min between 5 and 60),
    constraint lobbies_break_min_range check (break_min between 1 and 15),
    constraint lobbies_member_count_non_negative check (member_count >= 0)
);

-- 一覧取得（get-lobbies.ts）でよく使う絞り込み・並び替え向けのインデックス
create index if not exists lobbies_is_private_created_at_idx
    on public.lobbies (is_private, created_at desc);

create index if not exists lobbies_is_in_school_idx
    on public.lobbies (is_in_school);

-- Row Level Security
-- アプリはブラウザ・サーバーともに publishable（anon）キーでアクセスし、
-- ロビー操作に認証チェックを設けていないため、anon / authenticated に許可する。
alter table public.lobbies enable row level security;

create policy "ロビーは誰でも閲覧できる"
    on public.lobbies
    for select
    to anon, authenticated
    using (true);

create policy "ロビーは誰でも作成できる"
    on public.lobbies
    for insert
    to anon, authenticated
    with check (true);

create policy "ロビーは誰でも更新できる"
    on public.lobbies
    for update
    to anon, authenticated
    using (true)
    with check (true);
