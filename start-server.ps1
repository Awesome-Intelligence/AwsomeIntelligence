$ErrorActionPreference = "Stop"
$PORT = 8080
$location = Get-Location

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Static Website Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Serving files from: $location" -ForegroundColor White
Write-Host "Local URL: http://localhost:$PORT" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

$types = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$PORT/")
$listener.Start()

Write-Host "Server started!" -ForegroundColor Green
Write-Host ""

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }
        
        $filePath = Join-Path $location $urlPath.TrimStart("/")
        $filePath = $filePath.Replace("/", "\")
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath)
            $contentType = $types[$ext]
            if (-not $contentType) {
                $contentType = "application/octet-stream"
            }
            
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.Close()
            
            Write-Host "$($request.HttpMethod) $urlPath -> 200 OK" -ForegroundColor Gray
        } else {
            $errorPage = "<html><body><h1>404 - File Not Found</h1><p>The file '$urlPath' was not found.</p></body></html>"
            $errorBytes = [System.Text.Encoding]::UTF8.GetBytes($errorPage)
            $response.StatusCode = 404
            $response.ContentType = "text/html"
            $response.ContentLength64 = $errorBytes.Length
            $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
            $response.Close()
            
            Write-Host "$($request.HttpMethod) $urlPath -> 404 Not Found" -ForegroundColor Red
        }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host ""
    Write-Host "Server stopped." -ForegroundColor Yellow
}