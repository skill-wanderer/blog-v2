# PowerShell script to update all blog posts to use authorId instead of full author object

$postsPath = "src\content\posts"
$mdxFiles = Get-ChildItem -Path $postsPath -Filter "*.mdx"

foreach ($file in $mdxFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Define the regex pattern to match the author block
    $authorPattern = @'
author:
  name: "Quan Nguyen"
  bio: "[\s\S]*?"
  avatar: "/images/authors/skill-wanderer-avatar.jpg"(?:
  social:
    linkedin: "/quan-nguyen-skill-wanderer"
    github: "skill-wanderer"
    website: "https://wanderings.skill-wanderer.com")?
'@

    # Replace with authorId
    $replacement = 'authorId: "quan-nguyen"'
    
    if ($content -match $authorPattern) {
        $updatedContent = $content -replace $authorPattern, $replacement
        Set-Content -Path $file.FullName -Value $updatedContent -NoNewline
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "No author pattern found in: $($file.Name)"
    }
}

Write-Host "All files processed!"
