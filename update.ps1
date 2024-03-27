# Script to update the Rocket League Overlay
# Author: Tristin Young
# Date: 3/27/2024

# Navigate to the RLDash directory
Set-Location -Path RLDash

# Attempt to pull the latest changes from the repository
try {
    git pull
    Write-Host "Update successful"
}
catch {
    # If there are errors, prompt the user
    do {
        $proceed = Read-Host "The error is likely due to your control panel settings being changed (or other aspects of the overlay). If you proceed, you may lose your changes. Do you want to proceed? (y/n)"
        
        switch ($proceed.ToLower()) {
            "y" {
                git checkout .
                try {
                    git pull
                    Write-Host "Update successful"
                    break
                }
                catch {
                    Write-Host "Failed to update after discarding changes."
                    exit
                }
            }
            "n" {
                Write-Host "Update canceled."
                exit
            }
            default {
                Write-Host "Invalid input. Please try again."
            }
        }
    }
    while ($true)
}
