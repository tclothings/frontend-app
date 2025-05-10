import { FunnelIcon } from "@heroicons/react/24/outline"

export default function TableIcon({ iconKey }: { iconKey: string }) {
    switch (iconKey) {
        case "filterArrow": return <FunnelIcon />
        default: return null
    }
}