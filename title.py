from rich import print
from rich.text import Text

def print_title():
    title = Text('''
    ╭──────────────────────────────────────────────────────────────────╮
    │                           Exploterm  🌎                          │
    ╰──────────────────────────────────────────────────────────────────╯
    ''',style="green")
    print(title)

