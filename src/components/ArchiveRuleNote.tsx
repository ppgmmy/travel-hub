export function ArchiveRuleNote() {
  return (
    <aside className="border border-line bg-wash px-3 py-3 text-sm leading-6">
      <p className="font-medium">封存規則</p>
      <p className="mt-1 text-muted">
        旅程結束日已過（以香港日期計），或狀態設為{" "}
        <code className="font-mono text-ink">archived</code>
        ，就會由「旅程」移到「檔案」。兩項可以同時成立。
      </p>
    </aside>
  );
}
