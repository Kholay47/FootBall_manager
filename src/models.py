class Player:
    def __init__(
        self,
        name: str,
        tier: str,
        rank: int = 0,
        available: bool = False,
    ):
        self.name = name
        self.tier = tier
        self.rank = rank
        self.available = available

    def to_dict(self):
        return {
            "name": self.name,
            "tier": self.tier,
            "rank": self.rank,
            "available": self.available,
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data["name"],
            tier=data["tier"],
            rank=data.get("rank", 0),
            available=data.get("available", False),
        )

    def __repr__(self):
        status = "Available" if self.available else "Unavailable"

        return (
            f"{self.name} | "
            f"Tier: {self.tier} | "
            f"Rank: {self.rank} | "
            f"{status}"
        )