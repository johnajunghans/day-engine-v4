import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { MouseEventHandler } from "react"

interface DeleteDialogWrapperProps {
    title: string
    description: string
    handleDelete: MouseEventHandler<HTMLButtonElement>
}
   
export function DeleteDialogWrapper({ title, description, handleDelete }: DeleteDialogWrapperProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="icon" size="icon"><Trash2 /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}