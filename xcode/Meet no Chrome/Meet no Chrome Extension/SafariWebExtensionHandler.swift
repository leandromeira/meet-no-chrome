import AppKit
import SafariServices

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        func respond(_ ok: Bool) {
            let item = NSExtensionItem()
            item.userInfo = [SFExtensionMessageKey: ["ok": ok]]
            context.completeRequest(returningItems: [item], completionHandler: nil)
        }

        guard let item = context.inputItems.first as? NSExtensionItem,
              let message = item.userInfo?[SFExtensionMessageKey] as? [String: Any],
              message["type"] as? String == "openMeet",
              let rawURL = message["url"] as? String,
              let url = URL(string: rawURL),
              url.scheme?.lowercased() == "https",
              let host = url.host?.lowercased(),
              host == "meet.google.com" || host.hasSuffix(".meet.google.com"),
              url.user == nil, url.password == nil,
              let chrome = NSWorkspace.shared.urlForApplication(withBundleIdentifier: "com.google.Chrome")
        else {
            respond(false)
            return
        }

        let configuration = NSWorkspace.OpenConfiguration()
        NSWorkspace.shared.open([url], withApplicationAt: chrome, configuration: configuration) { _, error in
            respond(error == nil)
        }
    }
}
