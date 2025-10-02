"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react"
import { useLobby } from "../lobby-provider";

export function WelcomeForm() {
    const { setIsFormSubmitted } = useLobby();
    const [isOpen, setIsOpen] = useState(true);
    const [goal, setGoal] = useState("");
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsFormSubmitted(true);
        setIsOpen(false);
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                onEscapeKeyDown={(e) => {
                    e.preventDefault();
                }}
                showCloseButton={false}
            >
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>自習部屋へようこそ！</DialogTitle>
                        <DialogDescription>
                            入る前に、あなたの作業内容を教えてください
                        </DialogDescription>
                        <div>
                            <Label>作業内容</Label>
                            <Input 
                                id="goal"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                required
                                />
                        </div>
                        <DialogFooter>
                            <Button type="submit">送信する</Button>
                        </DialogFooter>
                    </DialogHeader>
                </form>
            </DialogContent>
        </Dialog>
    )
}
