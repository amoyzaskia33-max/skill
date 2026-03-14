# Git 저장소 설정 스크립트
# 프로젝트 디렉토리에 Git 저장소를 올바르게 설정합니다

$ErrorActionPreference = "Stop"

# 현재 스크립트의 디렉토리를 프로젝트 루트로 사용
$projectRoot = $PSScriptRoot

Write-Host "프로젝트 디렉토리: $projectRoot" -ForegroundColor Green

# 사용자 홈 디렉토리의 .git 백업 (이미 백업되어 있으면 스킵)
$homeGit = Join-Path $env:USERPROFILE ".git"
$homeGitBackup = Join-Path $env:USERPROFILE ".git.backup"
if (Test-Path $homeGit) {
    if (-not (Test-Path $homeGitBackup)) {
        Rename-Item $homeGit $homeGitBackup -ErrorAction SilentlyContinue
        Write-Host "홈 디렉토리의 .git을 .git.backup으로 백업했습니다." -ForegroundColor Yellow
    }
}

# 프로젝트 디렉토리로 이동
Set-Location $projectRoot
Write-Host "작업 디렉토리: $(Get-Location)" -ForegroundColor Green

# Git 저장소 초기화 (없는 경우에만)
if (-not (Test-Path ".git")) {
    Write-Host "Git 저장소를 초기화합니다..." -ForegroundColor Cyan
    git init
} else {
    Write-Host "Git 저장소가 이미 존재합니다." -ForegroundColor Yellow
}

# 원격 저장소 설정
Write-Host "원격 저장소를 설정합니다..." -ForegroundColor Cyan
git remote remove origin 2>&1 | Out-Null
git remote add origin https://github.com/MetachainArt/dms-tech-lab.git
git remote -v

# 브랜치 이름 설정
Write-Host "브랜치를 main으로 설정합니다..." -ForegroundColor Cyan
git branch -M main 2>&1 | Out-Null

# 원격 저장소에서 최신 정보 가져오기
Write-Host "원격 저장소에서 최신 정보를 가져옵니다..." -ForegroundColor Cyan
git fetch origin main 2>&1 | Out-Null

Write-Host "`n설정 완료!" -ForegroundColor Green
Write-Host "현재 위치: $(Get-Location)" -ForegroundColor Green
Write-Host "Git 저장소 루트: $(git rev-parse --show-toplevel 2>&1)" -ForegroundColor Green
