# Installation script for the Rocket League Overlay
# This install only pertains to Windows-based systems
# Author: Tristin Young
# Date: 3/27/2024

# 1. Git Clone Project
git clone --branch main --single-branch https://github.com/Tristin-Young/RLDash.git

# 2. Navigate to RLDash directory
Set-Location -Path RLDash

# 3. Install dependencies
npm install

# 4. Build the project
npm run build
