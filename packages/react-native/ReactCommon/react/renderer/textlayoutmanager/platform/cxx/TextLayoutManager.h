/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#pragma once

#include <memory>

#include <react/renderer/attributedstring/AttributedString.h>
#include <react/renderer/attributedstring/AttributedStringBox.h>
#include <react/renderer/attributedstring/ParagraphAttributes.h>
#include <react/renderer/core/LayoutConstraints.h>
#include <react/renderer/textlayoutmanager/TextLayoutContext.h>
#include <react/renderer/textlayoutmanager/TextMeasureCache.h>
#include <react/utils/ContextContainer.h>

namespace facebook::react {

class TextLayoutManager;

using SharedTextLayoutManager = std::shared_ptr<const TextLayoutManager>;

/*
 * Cross platform facade for Android-specific TextLayoutManager.
 */
class TextLayoutManager {
 public:
  TextLayoutManager(const ContextContainer::Shared& contextContainer) {}

  virtual ~TextLayoutManager() = default;

  /*
   * Measures `attributedStringBox` using native text rendering infrastructure.
   */
  virtual TextMeasurement measure(
      AttributedStringBox attributedStringBox,
      ParagraphAttributes paragraphAttributes,
      const TextLayoutContext& layoutContext,
      LayoutConstraints layoutConstraints) const;

  /**
   * Measures an AttributedString on the platform, as identified by some
   * opaque cache ID.
   */
  virtual TextMeasurement measureCachedSpannableById(
      int64_t cacheId,
      const ParagraphAttributes& paragraphAttributes,
      LayoutConstraints layoutConstraints) const;

  /*
   * Measures lines of `attributedString` using native text rendering
   * infrastructure.
   */
  virtual LinesMeasurements measureLines(
      AttributedString attributedString,
      ParagraphAttributes paragraphAttributes,
      Size size) const;

  /*
   * Calculates baseline of `attributedString` using native text rendering
   * infrastructure.
   */
  virtual Float baseline(
      AttributedString attributedString,
      ParagraphAttributes paragraphAttributes,
      Size size) const;

  /*
   * Returns an opaque pointer to platform-specific TextLayoutManager.
   * Is used on a native views layer to delegate text rendering to the manager.
   */
  void* getNativeTextLayoutManager() const;
};

} // namespace facebook::react
