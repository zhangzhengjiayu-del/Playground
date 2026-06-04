import Foundation
import Vision
import AppKit

if CommandLine.arguments.count < 3 {
    fputs("Usage: swift ocr_images.swift <image-dir> <output-file>\n", stderr)
    exit(2)
}

let imageDir = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let fm = FileManager.default

let files = try fm.contentsOfDirectory(at: imageDir, includingPropertiesForKeys: nil)
    .filter { $0.pathExtension.lowercased() == "jpg" || $0.pathExtension.lowercased() == "jpeg" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }

var rendered = ""

for file in files {
    guard let image = NSImage(contentsOf: file),
          let tiff = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff),
          let cgImage = bitmap.cgImage else {
        rendered += "\n===== \(file.lastPathComponent) =====\n[Could not load image]\n"
        continue
    }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    request.recognitionLanguages = ["en-US"]

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
        let lines = request.results?.compactMap { $0.topCandidates(1).first?.string } ?? []
        rendered += "\n===== \(file.lastPathComponent) =====\n"
        rendered += lines.joined(separator: "\n")
        rendered += "\n"
    } catch {
        rendered += "\n===== \(file.lastPathComponent) =====\n[OCR error: \(error)]\n"
    }
}

try rendered.write(to: output, atomically: true, encoding: .utf8)
