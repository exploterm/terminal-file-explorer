
from rich import print as rprint
from rich.text import Text

def printtitle():
    title = Text('''
    ╭──────────────────────────────────────────────────────────────────╮
    │                           Exploterm  🌎                          │
    ╰──────────────────────────────────────────────────────────────────╯
    ''',style="green")
    rprint(title)

