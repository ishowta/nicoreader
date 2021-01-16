import { Callback, Feed } from "app/types"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { Button } from "@material-ui/core"
import { CreateFeedInput } from "app/feeds/mutations/createFeed"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { MoveFeedInput } from "app/feeds/mutations/moveFeed"
import { UpdateFeedInput } from "app/feeds/mutations/updateFeed"
import { DeleteFeedInput } from "app/feeds/mutations/deleteFeed"
import Feeder from "app/components/feeder"
import { createStyle } from "app/utils"
import { memo } from "react"

type BodyPropType = {
  feeds: Feed[]
  createFeed: Callback<CreateFeedInput>
  deleteFeed: Callback<DeleteFeedInput>
  updateFeed: Callback<UpdateFeedInput>
  moveFeed: Callback<MoveFeedInput>
}

const SortableTimeline = SortableElement(({ feed, index }: { feed: Feed; index: number }) => {
  return (
    <div style={styles.timeline}>
      <Feeder feed={feed} settingDefaultOpened={feed.query === ""} />
    </div>
  )
})

const SortableTimelineList = SortableContainer(({ feeds }: { feeds: Feed[] }) => {
  return (
    <div style={{ display: "flex" }}>
      {feeds.map((feed, index) => {
        return <SortableTimeline key={`item-${feed.id}`} index={index} feed={feed} />
      })}
    </div>
  )
})

const AddNewFeedButton = ({ addNewFeed }: { addNewFeed: () => void }) => {
  return (
    <div style={styles.timeline}>
      <span>
        <Button style={styles.addButton} onClick={() => addNewFeed()}>
          {" "}
          +{" "}
        </Button>
      </span>
    </div>
  )
}

const Body = ({ feeds, createFeed, moveFeed }: BodyPropType) => {
  const currentUser = useCurrentUser()

  return (
    <div style={styles.body}>
      <SortableTimelineList
        feeds={feeds}
        onSortEnd={(e) =>
          moveFeed({ id: feeds[e.oldIndex].id, newZIndex: feeds[e.newIndex].zindex })
        }
        useDragHandle={true}
        axis="x"
        lockAxis="x"
      />
      {currentUser && (
        <AddNewFeedButton
          addNewFeed={() =>
            createFeed({
              type: "Tags",
              query: "",
            })
          }
        />
      )}
    </div>
  )
}

export default memo(Body)

const styles = createStyle({
  body: {
    backgroundColor: "#1A1A1A",
    height: "calc(100% - 40px)",
    minWidth: "100%",
    overflowX: "auto",
    display: "flex",
  },
  timeline: {
    display: "inline-block",
    paddingTop: 12,
    paddingLeft: 9,
    paddingRight: 9,
  },
  addButton: {
    backgroundColor: "#292929",
    height: "100%",
    width: 260,
    fontSize: "50px",
  },
})
