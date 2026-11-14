-- Abre o Safari, acessa Ajustes > Desenvolvimento e clica em
-- "Permitir extensões não assinadas" se estiver desmarcado.
-- O macOS exibirá o prompt de senha ou Touch ID para confirmar.

tell application "Safari" to activate
delay 0.8

tell application "System Events"
	tell process "Safari"
		keystroke "," using command down
		delay 0.6

		set settingsWin to window 1
		tell toolbar 1 of settingsWin
			if exists button "Desenvolvimento" then
				click button "Desenvolvimento"
			else if exists button "Desenvolvedor" then
				click button "Desenvolvedor"
			else if exists button "Developer" then
				click button "Developer"
			end if
		end tell
		delay 0.4

		set cbList to {}
		try
			set cbList to every checkbox of group 1 of group 1 of settingsWin
		end try
		if (count of cbList) is 0 then
			set cbList to every checkbox of settingsWin
		end if

		repeat with cb in cbList
			set cbName to name of cb as text
			if cbName contains "assinadas" or cbName contains "unsigned" then
				if (value of cb) is 0 then
					click cb
				end if
				exit repeat
			end if
		end repeat
	end tell
end tell
