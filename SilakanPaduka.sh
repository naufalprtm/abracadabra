#!/bin/bash

FOLDER="./tolong-kaki-saya-sakit"
LOG_FILE="bot_management.log"
echo -e "\n\033[1;33m[INFO] Initiating system breach...\033[0m\n"
sleep 1
hex_codes_32byte=(
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
    "0x$(openssl rand -hex 32)"
)
colors=("31" "32" "33" "34" "35" "36")
color=${colors[$RANDOM % ${#colors[@]}]}

declare -a codes=("0xDEADBEEF" "0xBEEFCAFE" "0xCAFEBABE" "0xBADF00D" "0xFACEB00K" \
                  "0xDEADC0DE" "0xFEEDFACE" "0xBAADF00D" "0xC0FFEE" "0xBA5EBA11" \
                  "0xC0FFEEBEEF" "0xFEE1DEAD" "0xBEEF1337" "0xBAD1337")
color=$(($RANDOM % 7 + 31)) 
echo -e "\033[${color}m[INFO] Attempting to access user credentials...\033[0m"
sleep 0.2
echo -e "\033[${color}m[INFO] Connecting to database...\033[0m"
sleep 0.2
echo -e "\033[${color}m[WARNING] Breach detected! \033[0m"
sleep 0.2
echo -e "\033[1;31m[INFO] Injecting malware... ILOVEYOU virus initialized\033[0m"
sleep 0.2
echo -e "\033[1;31m[INFO] Executing remote shell...\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Installing keylogger...\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Downloading sensitive files...\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] WannaCry ransomware active, encrypting user data...\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Attempting to execute code in /etc/passwd...\033[0m"
sleep 0.1
echo -e "\033[1;31m[ERROR] Permission denied.\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Trying to access /dev/random...\033[0m"
sleep 0.1
echo -e "\033[1;31m[WARNING] Random data generated!\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Attempting to execute payload in /usr/bin/sudo...\033[0m"
sleep 0.1
echo -e "\033[1;31m[ERROR] Command not found.\033[0m"
sleep 0.3
echo -e "\033[1;31m[INFO] Accessing /root/.bashrc...\033[0m"
sleep 0.3
echo -e "\033[1;31m[ERROR] Access denied: Root privileges required.\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Injecting payload into /tmp...\033[0m"
sleep 0.1
echo -e "\033[1;31m[INFO] Executing /tmp/malicious_script...\033[0m"
sleep 0.5
echo -e "\033[1;31m[ERROR] Execution failed: File not found.\033[0m"
sleep 0.1
declare -a famous_viruses=(
    "ILOVEYOU" "MyDoom" "Melissa" "WannaCry" "Stuxnet" "Code Red" "Zeus" 
    "Conficker" "CryptoLocker" "Nimda" "Sasser" "SQL Slammer" "Storm Worm" 
    "Petya" "Cerber" "Ryuk" "Dridex" "TrickBot" "Emotet" "Locky" 
    "Sobig" "Blaster" "SirCam" "Trojan Horse" "SpyEye" "Klez" 
    "Bagle" "BugBear" "Chernobyl" "CIH" "CryptoWall" "Storm" 
    "Fizzer" "Waledac" "Michelangelo" "Jerusalem" "Brain" "Cascade"
)

random_code=${codes[$RANDOM % ${#codes[@]}]}
echo -e "\033[${color}m[CODE] Executing payload: $random_code\033[0m"
sleep 0.2
for hex_code in "${hex_codes_32byte[@]}"; do
    virus=${famous_viruses[$RANDOM % ${#famous_viruses[@]}]}
    echo -e "\033[${color}m[INFO] Executing 32-byte hex code: $hex_code with $virus virus payload\033[0m"
    sleep 0.1
done
random_code=${famous_viruses[$RANDOM % ${#famous_viruses[@]}]}
echo -e "\033[${color}m[CODE] Executing payload: $random_code\033[0m"
sleep 0.2

case $((RANDOM % 4)) in
    0) echo -e "\033[1;31m[ALERT] Just kidding! Don't panic!\033[0m" ;;  # Perbaikan error
    1) echo -e "\033[1;34m[INFO] Just a prank, bro!\033[0m" ;;          # Perbaikan error
    2) echo -e "\033[1;32m[INFO] Relax, it's all in good fun!\033[0m" ;; # Perbaikan error
    3) echo -e "\033[1;35m[INFO] No real hacking here! 😄\033[0m" ;;     # Perbaikan error
esac
sleep 0.2

# Menampilkan informasi tambahan
echo -e "\033[1;33m[INFO] Please wait while we finalize the process...\033[0m"
sleep 0.5

# Suara beep untuk efek tambahan
echo -e "\a"  # Suara beep
echo -e "\033[1;31m[WARNING] Oh no, are you panicking already? 🤦\033[0m"
echo -e "\033[1;33m[INFO] Don't forget to check your files here, genius:\033[0m"
echo -e "\033[1;36mhttps://www.virustotal.com/gui/home/upload\033[0m"
# Tampilkan pesan penutup yang beragam
echo -e "\n\033[1;32m[INFO] System restored. Thanks for playing! 😄\033[0m\n"
sleep 1
echo -e "\033[1;36m[INFO] Don't worry, your data is safe! 😅\033[0m\n"
sleep 1
echo -e "\033[1;35m[INFO] Just kidding! You're too clever to fall for that! 😂\033[0m\n"
sleep 1
echo -e "\033[1;34m[INFO] Remember: Always keep your software updated! 🔒\033[0m\n"
sleep 1
echo -e "\033[1;33m[INFO] Stay safe online, and don't do not execute non-open source! 💻\033[0m\n"
sleep 1
echo -e "\033[1;32m[INFO] Thanks for being a good sport! Until next time! 👋\033[0m\n"


# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No color

# Function to log messages
log() {
  echo -e "$(date '+%Y-%m-%d %H:%M:%S') - ${BLUE}$1${NC}" >> "$LOG_FILE"  # Log to file with color
  echo -e "${BLUE}$1${NC}"  # Print to console with color
}

# Function to check for the existence of node and npm
check_node_npm() {
  local not_found=0  # Ubah dari false ke 0 (yang berarti tidak ditemukan)

  if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found! Would you like to install it? (y/n)${NC}"
    read -p "> " install_choice
    if [[ "$install_choice" == "y" ]]; then
      # Instruksi untuk menginstal Node.js
      sudo apt-get install -y nodejs
      log "Node.js has been installed."
    fi
    not_found=1  # Set not_found ke 1 jika Node.js tidak ditemukan
  fi
  
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm not found! Would you like to install it? (y/n)${NC}"
    read -p "> " install_choice
    if [[ "$install_choice" == "y" ]]; then
      # Instruksi untuk menginstal npm
      sudo apt-get install -y npm
      log "npm has been installed."
    fi
    not_found=1  # Set not_found ke 1 jika npm tidak ditemukan
  fi

  return $not_found  # Kembalikan nilai not_found (0 atau 1)
}


# Function to install required dependencies
install_dependencies() {
  log "Checking and installing dependencies..."
  source ~/.bashrc
  sudo apt-get update
  sudo apt-get upgrade
  if ! command -v ifstat &> /dev/null; then
    sudo apt-get install -y ifstat
    log "ifstat has been installed."
  else
    log "ifstat is already installed."
  fi
}

# Function to start all bots in screen
start_bots() {
  log "Starting all bots in screen sessions..."
  for file in "$FOLDER"/*.js; do
    bot_name=$(basename "$file" .js)
    log "Starting ${GREEN}$bot_name${NC} in screen..."
    
    if sudo screen -dmS "$bot_name" bash -c "node \"$file\"; exec bash"; then
      pid=$(sudo screen -ls | grep "$bot_name" | awk '{print $1}' | cut -d'.' -f1)  # Get the PID
      log "Session '${GREEN}$bot_name${NC}' has started with PID '${GREEN}$pid${NC}'."
    else
      log "Failed to start $bot_name in screen."
    fi
  done
  log "Bot starting process completed."
}

# Function to check logs from screen sessions
check_logs() {
  log "List of running screen sessions:"
  sudo screen -ls | grep -Eo '[0-9]+.[a-zA-Z0-9]+' | while read session; do
    echo -e "${GREEN}$session${NC}"
  done
  
  read -p "Enter the name of the screen session to check (Ex: 440800.nomis): " session_name
  
  if sudo screen -list | grep -q "$session_name"; then
    log "Checking logs for session ${GREEN}$session_name${NC}..."
    sudo screen -r "$session_name"
    log "Example log output for session '${GREEN}$session_name${NC}':"
    log "------------------------------------------------"
    log "INFO: Bot $session_name started successfully."
    log "INFO: Processing data..."
    log "ERROR: Failed to connect to the API."
    log "INFO: Retrying connection..."
    log "INFO: Data processed successfully."
    log "------------------------------------------------"
  else
    log "Screen session '${RED}$session_name${NC}' not found."
  fi
}

# Function to stop all bots
stop_bots() {
  log "Stopping all screen sessions..."
  pids=$(sudo screen -ls | grep -o '[0-9]*\.[^ ]*' | awk '{print $1}' | tr '\n' ' ')

  if [ -z "$pids" ]; then
    log "No screen sessions are currently running."
    return
  fi

  for pid in $pids; do
    sudo screen -S "$pid" -X quit
    log "Session '${RED}$pid${NC}' has been stopped."
  done

  log "All bots have been stopped."
}

# Function to display CPU and RAM usage
display_usage() {
  echo -e "${YELLOW}CPU and RAM Usage:${NC}"
  local cpu_usage=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
  local ram_usage=$(free | grep Mem | awk '{print $3/$2 * 100.0}')

  echo -e "CPU Usage: ${GREEN}$cpu_usage%${NC}"
  echo -e "RAM Usage: ${GREEN}$(printf "%.2f" "$ram_usage")%${NC}"
  echo ""
}

# Function to display device information
log_device_info() {
  device_info=$(uname -n)
  ip_address=$(hostname -I | awk '{print $1}')
  cpu_info=$(lscpu | grep 'Model name' | awk -F: '{print $2}' | xargs)
  ram_info=$(free -h | grep 'Mem:' | awk '{print $2}')
  gpu_info=$(lspci | grep -i 'vga' | awk -F: '{print $2}' | xargs)

  log "=========================================="
  log "           Device Information            "
  log "=========================================="
  log "Device: $device_info"
  log "IP: $ip_address"
  log "CPU: $cpu_info"
  log "RAM: $ram_info"
  [[ -n "$gpu_info" ]] && log "GPU: $gpu_info" || log "GPU: No GPU detected"
}

# Main menu
install_dependencies  # Install dependencies on first run
check_node_npm  # Check for node and npm

while true; do
  clear  # Clear the screen
  log_device_info  # Display device information
  display_usage  # Display CPU and RAM usage
# Banner
echo -e "\n ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄       ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄ "
echo -e "▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌     ▐░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌"
echo -e " ▀▀▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀  ▐░▌   ▐░▌  ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀ "
echo -e "          ▐░▌     ▐░▌       ▐░▌ ▐░▌       ▐░▌     ▐░▌▐░▌    ▐░▌▐░▌          "
echo -e " ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌        ▐░▐░▌        ▐░▌     ▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄▄▄ "
echo -e "▐░░░░░░░░░░░▌     ▐░▌         ▐░▌         ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌"
echo -e "▐░█▀▀▀▀▀▀▀▀▀      ▐░▌        ▐░▌░▌        ▐░▌     ▐░▌   ▐░▌ ▐░▌▐░█▀▀▀▀▀▀▀▀▀ "
echo -e "▐░▌               ▐░▌       ▐░▌ ▐░▌       ▐░▌     ▐░▌    ▐░▌▐░▌▐░▌          "
echo -e "▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄█░█▄▄▄▄  ▐░▌   ▐░▌  ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄▄▄ "
echo -e "▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌     ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌"
echo -e " ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀       ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀ \n"
  echo -e "${YELLOW}==========================================${NC}"
  echo -e "${YELLOW}           Main Menu                     ${NC}"
  echo -e "${YELLOW}==========================================${NC}"

  # Add the welcome message and credits
  echo -e "${GREEN}Welcome to the Telegram Bot Utility!${NC}"
  echo -e "${GREEN}----------------------------------${NC}"
  echo -e "${CYAN}\nCredit:${NC}"
  echo -e "${GREEN}GitHub: https://github.com/winsnip${NC}"
  echo -e "${GREEN}Telegram: https://t.me/winsnip${NC}"
  echo -e "${GREEN}----------------------------------${NC}"
  echo -e "${GREEN}GitHub: https://github.com/Solana0x${NC}"
  echo -e "${GREEN}----------------------------------${NC}"
  echo -e "${GREEN}GitHub: https://github.com/Galkurta${NC}"
  echo -e "${GREEN}Telegram: https://t.me/galkurtarchive${NC}"
  echo -e "${GREEN}----------------------------------${NC}"
  echo -e "${YELLOW}zixine${NC}"

  # Display additional messages
  echo -e "${RED}NOT FOR SALE!!!!!${NC}"
  echo -e "${RED}FUCK FOR PEOPLE SELL THIS FOR MONEY!${NC}"
  
  echo -e "${GREEN}Quote for sellers:${NC}"
  echo -e "${GREEN}\"Greed can rob the world, but honesty can only get applause.\"${NC}"

  echo ""
  echo -e "${BLUE}Choose an option:${NC}"
  echo "1) Install dependencies"
  echo "2) Start all bots"
  echo "3) Check logs"
  echo "4) Stop all bots"
  echo "5) Exit"
  read -p "Enter your choice (1-5): " choice

  case $choice in
    1)
      install_dependencies
      ;;
    2)
      start_bots
      ;;
    3)
      check_logs
      ;;
    4)
      stop_bots
      ;;
    5)
      log "Exiting the script."
      exit 0
      ;;
    *)
      log "${RED}Invalid choice, please try again.${NC}"
      ;;
  esac
done
