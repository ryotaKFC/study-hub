import Card from "./ui/card";
import Chat from "./Chat";

import { useEffect, useState } from "react";
import { supabaseClient } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button";

type Post = {
    id: number;
    start_study_at: string;
    study_min: number;
    break_min: number;
    created_at: string;
    message: string;
}

export default function ChatCard() {
    console.log(supabaseClient);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState('');
    
    useEffect(() => {
        const fetchPosts = async () => {
            const {data, error} = await supabaseClient
                .from("lobby")
                .select("*")
                .order("created_at", { ascending: false});
            if (!error && data) {
                setPosts(data);
            }
        };
        fetchPosts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const { error } = await supabaseClient.from("lobby").insert([{start_study_at: newPost}]);
        if (!error) {
            setNewPost("");
            // 投稿したら再取得
            const { data } = await supabaseClient.from("lobby").select("*").order("created_at", { ascending: false});
            if (data) setPosts(data);
        }
    }
    
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬絵文字チャット</h1>
            <div className="p-7 text-center text-8xl rounded-xl text-emerald-900">
                <form onSubmit={handleSubmit} className="mb-6">
                    <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)}></textarea>
                </form>
                <Button variant="default">投稿</Button>
                
                {posts.map((post) => (
                    <div key={post.id}>
                        <p>{post.message}</p>
                    </div>
                ))}
            </div>
            <Chat />
        </Card>
    )
}
