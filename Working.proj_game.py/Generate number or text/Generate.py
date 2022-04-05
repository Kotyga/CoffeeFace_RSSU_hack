import tkinter as tk
from tkinter import *
from tkinter import messagebox
from random import randrange
import random
import string

def generate_random_num():
    return randrange(10, 21, 1)

def generate_random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

r_s = generate_random_string(generate_random_num())

def show_message():
    messagebox.showinfo("Помни меня", "Верно!" if message.get() == r_s else "Попробуй ещё :)")
          
root = Tk()
root.title("Помни меня")
root.geometry("300x250")
 
message = StringVar()
 
message_entry = Entry(textvariable=message)
message_entry.place(relx=.5, rely=.1, anchor="c")
 
message_button = Button(text = "Введи без ошибок: \n" + r_s, command=show_message)
message_button.pack()
message_button.place(relx=.5, rely=.5, anchor="c")

root.mainloop()

print(message.get()[0])